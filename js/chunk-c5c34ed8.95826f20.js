(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5c34ed8"],{"0454":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticStyle:{padding:"20px"}},[n("v-row",{attrs:{justify:"space-between",align:"center"}},[n("h1",{staticClass:"mb-3"},[t._v("Loans")]),n("div",[n("v-btn",{attrs:{color:"primary",plain:""},on:{click:function(a){return t.init()}}},[n("v-icon",[t._v("mdi-refresh")])],1),n("v-btn",{attrs:{depressed:"",color:"primary",to:"loans/register"}},[n("v-icon",{staticClass:"pull-right",attrs:{small:""}},[t._v("mdi-plus")]),t._v(" Loan ")],1)],1)]),t.isLoading?n("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"64"}})],1):t._e(),t.loans.length||t.isLoading?t.loans.length&&!t.isLoading?n("v-row",t._l(t.loans,(function(a){return n("v-col",{key:a.id,attrs:{sm:"4"}},[n("v-card",{attrs:{disabled:"DEACTIVADED"==a.situacao||"PAID"==a.situacao}},[n("v-card-title",[t._v(" # "+t._s(a.stockId)+" ")]),n("v-card-subtitle",[n("small",[t._v("("+t._s(a.nomeCarro)+")")])]),"DEACTIVADED"!=a.situacao&&"PAID"!=a.situacao?n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{to:"/loans/"+a.id,depressed:""}},[t._v(" View loan ")]),n("v-btn",{attrs:{depressed:"",color:"error"},on:{click:function(n){return t.inactive(a.id)}}},[t._v(" Inactive ")])],1):t._e(),"DEACTIVADED"==a.situacao?n("v-card-actions",[n("v-btn",{attrs:{depressed:"",color:"error"}},[t._v(" DEACTIVADED ")])],1):t._e(),"PAID"==a.situacao?n("v-card-actions",[n("v-btn",{attrs:{depressed:"",color:"success"}},[t._v(" ALL PAID ")])],1):t._e()],1)],1)})),1):t._e():n("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[n("v-alert",{attrs:{dense:"",type:"info"}},[t._v(" No loans registered. ")])],1)],1)},r=[],i=(n("d3b7"),n("96cf"),n("1da1")),s=n("acb8"),o=n("7841"),c={name:"Home",data:function(){return{loans:[],isLoading:!1}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.init();case 1:case"end":return a.stop()}}),a)})))()},methods:{init:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.isLoading=!0,t.loans=[],s["a"].findAll().then((function(a){t.loans=a.data,t.loans=t.loans.sort()})).catch((function(t){o["a"].createToastFailed("An error ocurred! Please try again!")})).finally((function(){t.isLoading=!1}));case 3:case"end":return a.stop()}}),a)})))()},inactive:function(t){var a=this;this.$confirm("This action will deactivate this register (this action cannot be undone). Do you wish to continue?").then((function(n){n&&(a.isLoading=!0,s["a"].inactive(t).then((function(){o["a"].createToastSuccess("Operation success."),a.init()})).catch((function(t){o["a"].createToastFailed("An error ocurred! Please try again!")})))}))}}},u=c,l=n("2877"),d=n("6544"),v=n.n(d),f=n("0798"),p=n("8336"),g=n("b0af"),h=n("99d9"),m=n("62ad"),b=n("132d"),w=n("490a"),_=n("0fd9"),A=n("2fa4"),y=Object(l["a"])(u,e,r,!1,null,null,null);a["default"]=y.exports;v()(y,{VAlert:f["a"],VBtn:p["a"],VCard:g["a"],VCardActions:h["b"],VCardSubtitle:h["c"],VCardTitle:h["e"],VCol:m["a"],VIcon:b["a"],VProgressCircular:w["a"],VRow:_["a"],VSpacer:A["a"]})},acb8:function(t,a,n){"use strict";n("99af");var e=n("db49");a["a"]={findAll:function(){return e["a"].get("contratos")},findById:function(t){return e["a"].get("contratos/".concat(t))},create:function(t){return e["a"].post("contratos",t)},inactive:function(t){return e["a"].patch("contratos/".concat(t,"/inativar"))},pay:function(t,a){return e["a"].post("contratos/".concat(t,"/pagar?nrosParcela=").concat(a))}}}}]);
//# sourceMappingURL=chunk-c5c34ed8.95826f20.js.map