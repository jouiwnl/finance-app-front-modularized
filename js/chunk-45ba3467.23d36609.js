(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45ba3467"],{9917:function(t,e,a){"use strict";var n=a("db49");e["a"]={findAll:function(){return n["a"].get("email")},findById:function(t){return n["a"].get("email/".concat(t))},create:function(t){return n["a"].post("email",t)},update:function(t,e){return n["a"].put("email/".concat(e),t)},delete:function(t){return n["a"].delete("email/".concat(t))}}},"9a84":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{padding:"20px"}},[a("v-row",{attrs:{justify:"space-between",align:"center"}},[a("h1",{staticClass:"mb-3"},[t._v("Emails")]),a("div",[a("v-btn",{attrs:{color:"primary",plain:""},on:{click:function(e){return t.init()}}},[a("v-icon",[t._v("mdi-refresh")])],1),a("v-btn",{attrs:{depressed:"",color:"primary",to:"emails/register"}},[a("v-icon",{staticClass:"pull-right",attrs:{small:""}},[t._v("mdi-plus")]),t._v(" E-mail ")],1)],1)]),t.isLoading?a("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"64"}})],1):t._e(),t.emails.length||t.isLoading?t._e():a("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[a("v-alert",{attrs:{dense:"",type:"info"}},[t._v(" No emails registered. ")])],1),t.emails.length?a("v-row",t._l(t.emails,(function(e){return a("v-col",{key:e.id,attrs:{sm:"4"}},[a("v-card",[a("v-card-title",[t._v(" "+t._s(e.nome)+" ")]),a("v-card-subtitle",[a("small",[t._v("("+t._s(e.email)+")")])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{to:"/emails/"+e.id,depressed:""}},[t._v(" Edit ")]),a("v-btn",{attrs:{depressed:"",color:"error"},on:{click:function(a){return t.remove(e.id)}}},[t._v(" Delete ")])],1)],1)],1)})),1):t._e()],1)},r=[],i=(a("d3b7"),a("96cf"),a("1da1")),s=a("7841"),c=a("9917"),o={name:"Home",data:function(){return{emails:[],isLoading:!0}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.init();case 1:case"end":return e.stop()}}),e)})))()},methods:{init:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.isLoading=!0,t.emails=[],c["a"].findAll().then((function(e){t.emails=e.data,t.emails=t.emails.sort()})).catch((function(t){s["a"].createToastFailed("An error ocurred! Please try again!")})).finally((function(){t.isLoading=!1}));case 3:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;this.$confirm("This action will deactivate this register (this action cannot be undone). Do you wish to continue?").then((function(a){a&&c["a"].delete(t).then((function(t){s["a"].createToastSuccess("Operation success."),e.init()})).catch((function(t){s["a"].createToastFailed("An error ocurred! Please try again!")}))}))}}},l=o,u=a("2877"),d=a("6544"),m=a.n(d),f=a("0798"),v=a("8336"),p=a("b0af"),h=a("99d9"),g=a("62ad"),w=a("132d"),b=a("490a"),_=a("0fd9"),y=a("2fa4"),V=Object(u["a"])(l,n,r,!1,null,null,null);e["default"]=V.exports;m()(V,{VAlert:f["a"],VBtn:v["a"],VCard:p["a"],VCardActions:h["b"],VCardSubtitle:h["c"],VCardTitle:h["e"],VCol:g["a"],VIcon:w["a"],VProgressCircular:b["a"],VRow:_["a"],VSpacer:y["a"]})}}]);
//# sourceMappingURL=chunk-45ba3467.23d36609.js.map