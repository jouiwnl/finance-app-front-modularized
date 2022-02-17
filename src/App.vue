<template>
  <v-app>
    <v-app-bar app dense flat outlined>
      <v-tabs>
        <v-tab to="/">Dashboard</v-tab>
        <v-tab to="/partners">Partners</v-tab>
        <v-tab to="/loans">Loans</v-tab>
        <v-tab to="/finder">Find Loans</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
