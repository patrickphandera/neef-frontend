<template>
    <v-card class="pa-4 ma-2">
      <div class="font-weight-black pb-4">
        Documentation
      </div>
      <v-row>
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Gender</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>String</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: <em>'Male'</em>, <em>'Female'</em></v-list-item-subtitle>
              <v-list-item-subtitle>Description: Gender of the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Required</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Age</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any positive integer</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Current age of the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Must be a positive number</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dependents</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any non-negative integer</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Number of dependents directly relying on the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Cannot be negative</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Income</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any positive number</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Monthly cumulative income of the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Must be a positive number</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Loan Amount</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any positive number</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Amount of loan requested by the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Must be a positive number</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Collateral</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any non-negative number</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Collateral value provided by the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Cannot be negative</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Term</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any positive integer (in months)</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Duration in months for loan payment.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Must be positive</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Rate</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>Number</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: Any positive number (percentage)</v-list-item-subtitle>
              <v-list-item-subtitle>Description: Payment rate associated with the loan.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Must be positive</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
  
        <v-col cols="6">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Loan Type</v-list-item-title>
              <v-list-item-subtitle>Type: <strong>String</strong></v-list-item-subtitle>
              <v-list-item-subtitle>Possible Values: <em>'Youth Enterprise'</em>, <em>'Women Empowerment'</em></v-list-item-subtitle>
              <v-list-item-subtitle>Description: Category of loan requested by the applicant.</v-list-item-subtitle>
              <v-list-item-subtitle>Validation: <strong>Required</strong></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        toggle: true
      };
    }
  };
  </script>
  