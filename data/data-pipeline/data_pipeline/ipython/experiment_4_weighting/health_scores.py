#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


class HealthScores:
    """
    Calculates health scores by calling the final_scaled_data() method

    Arguments:
    weights_1(np array) : weights of model 1.
    weights_2(np array) : weights of model 2.
    weights_3(np array) : weights of model 3.
    multiplied_data(df) : all cenusus tracts data which needs to be multiplied with weights to get health scores
    geoid(Series) : geoids of census tracts to concatenate with our health scores data.
    is_weighted_average(boolean) : weights calculation methodology(default is True)
    weightage(list) : weightage for each y-variable
    """

    def __init__(
        self,
        weights_1,
        weights_2,
        weights_3,
        multiplied_data,
        geoid,
        is_weighted_average=True,
        weightage=[0.25, 0.25, 0.5],
    ):

        self.weights_1 = weights_1
        self.weights_2 = weights_2
        self.weights_3 = weights_3
        self.multiplied_data = multiplied_data
        self.geoid = geoid
        self.is_weighted_average = is_weighted_average
        self.weightage = weightage
        self.weights = np.zeros(self.weights_1.shape).reshape(-1, 1)

    def _get_weights(self):
        """
        Averages weights of all the models and performs transformation so that sum of all weights will be equal to 1.

        Arguments : None
        Returns : Averaged weights which totals to 1.
        """
        weights = np.hstack(
            (
                self.weights_1.reshape(-1, 1),
                self.weights_2.reshape(-1, 1),
                self.weights_3.reshape(-1, 1),
            )
        )
        weights = np.sum(weights, axis=1) / weights.shape[1]
        self.weights = weights / np.sum(weights)

        return self.weights

    def _weighted_average(self):
        """
        weighted average:
        Averages weights of all the models with specified weightage for each model. And performs transformation so that sum of
        all weights will be equal to 1.

        Arguments : None
        Returns : Averaged weights which totals to 1.(np array)
        """
        weights = np.hstack(
            (
                self.weights_1.reshape(-1, 1) * self.weightage[0],
                self.weights_2.reshape(-1, 1) * self.weightage[1],
                self.weights_3.reshape(-1, 1) * self.weightage[2],
            )
        )
        weights = np.sum(weights, axis=1)
        self.weights = weights / np.sum(weights)

        return self.weights

    def _health_score(self):
        """
        Converts data in (0 to 100)scale using min max scaler and multiiplying with 100.
        Then it calculates health scores by multiplying with the weights

        Returns : data frame with health score and x variables in (0 - 100)scale.
        """
        columns = list(self.multiplied_data.columns) + ["health_scores"]
        scaled_data = (
            MinMaxScaler().fit_transform(self.multiplied_data.to_numpy()) * 100
        )
        health_scores = np.dot(scaled_data, self.weights.reshape(-1, 1))
        health_scores = MinMaxScaler().fit_transform(health_scores) * 100
        scaled_data = np.hstack((scaled_data, health_scores))

        scaled_data = pd.DataFrame(data=scaled_data, columns=columns)

        return scaled_data

    def final_scaled_data(self):
        """
        Calls appropriate methods in class based on arguments. Concatenates geoids and health scores.

        Arguments : None
        Returns :
            final_data(df) : dataframe with all health scores and geoids
            weights_tables(df) : dataframe with each y-variable weights and averaged weights
        """

        # final scaled data
        if self.is_weighted_average:
            self._weighted_average()
        else:
            self._get_weights()

        scaled_data_100 = self._health_score()
        final_data = pd.concat([self.geoid, scaled_data_100], axis=1)

        weights_table = pd.DataFrame(
            {
                "phy_health_weights": self.weights_1,
                "mntl_health_weights": self.weights_2,
                "life_expectancy_weights": self.weights_3,
                "averaged_weights": self.weights,
            },
            index=self.multiplied_data.columns,
        )

        return final_data, weights_table
