(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d2f81"],{"5b86":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{padding:"20px"}},[r("v-row",{attrs:{justify:"space-between",align:"center"}},[r("h1",{staticClass:"mb-3"},[t._v("Partners")]),r("div",[r("v-btn",{attrs:{color:"primary",plain:""},on:{click:function(e){return t.init()}}},[r("v-icon",[t._v("mdi-refresh")])],1),r("v-btn",{attrs:{depressed:"",color:"primary",to:"partners/register"}},[r("v-icon",{staticClass:"pull-right",attrs:{small:""}},[t._v("mdi-plus")]),t._v(" Partner ")],1)],1)]),t.isLoading?r("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[r("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"64"}})],1):t._e(),t.partners.length||t.isLoading?t._e():r("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[r("v-alert",{attrs:{dense:"",type:"info"}},[t._v(" No partners registered. ")])],1),t.partners.length?r("v-row",t._l(t.partners,(function(e){return r("v-col",{key:e.id,attrs:{sm:"4"}},[r("v-card",{attrs:{disabled:"DEACTIVADED"==e.situacao}},[r("v-card-title",[t._v(" "+t._s(e.nome)+" ")]),r("v-card-subtitle",[r("small",[t._v("("+t._s(e.email)+")")])]),"DEACTIVADED"!=e.situacao?r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{to:"/partners/"+e.id,depressed:""}},[t._v(" Edit ")]),r("v-btn",{attrs:{depressed:"",color:"error"},on:{click:function(r){return t.inactive(e.id)}}},[t._v(" Inactive ")])],1):t._e(),"DEACTIVADED"==e.situacao?r("v-card-actions",[r("v-btn",{attrs:{depressed:"",color:"error"}},[t._v(" DEACTIVADED ")])],1):t._e()],1)],1)})),1):t._e()],1)},n=[],i=(r("d3b7"),r("96cf"),r("1da1")),s=r("6b3a"),c=r("7841"),o={name:"Home",data:function(){return{partners:[],isLoading:!0}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.init();case 1:case"end":return e.stop()}}),e)})))()},methods:{init:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.isLoading=!0,t.partners=[],s["a"].findAll().then((function(e){t.partners=e.data,t.partners=t.partners.sort()})).catch((function(t){c["a"].createToastFailed("An error ocurred! Please try again!")})).finally((function(){t.isLoading=!1}));case 3:case"end":return e.stop()}}),e)})))()},inactive:function(t){var e=this;this.$confirm("This action will deactivate all loans related to this registration (this action cannot be undone). Do you wish to continue?").then((function(r){r&&s["a"].inactive(t).then((function(){c["a"].createToastSuccess("Operation success."),e.init()})).catch((function(t){c["a"].createToastFailed("An error ocurred! Please try again!")}))}))}}},d=o,u=r("2877"),l=r("6544"),v=r.n(l),p=r("0798"),f=r("8336"),h=r("b0af"),m=r("99d9"),g=r("62ad"),b=r("132d"),w=r("490a"),_=r("0fd9"),y=r("2fa4"),V=Object(u["a"])(d,a,n,!1,null,null,null);e["default"]=V.exports;v()(V,{VAlert:p["a"],VBtn:f["a"],VCard:h["a"],VCardActions:m["b"],VCardSubtitle:m["c"],VCardTitle:m["e"],VCol:g["a"],VIcon:b["a"],VProgressCircular:w["a"],VRow:_["a"],VSpacer:y["a"]})}}]);
//# sourceMappingURL=chunk-2d0d2f81.4394e221.js.map