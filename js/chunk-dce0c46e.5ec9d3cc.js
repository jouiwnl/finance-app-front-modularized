(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dce0c46e"],{6023:function(t,e,a){},"61cf":function(t,e,a){"use strict";a("6023")},d7d4:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",{staticStyle:{"margin-top":"15px"},attrs:{justify:"center"}},[a("h1",{staticClass:"mb-3 text-center"},[t._v("Find loans")])]),a("v-container",{staticClass:"text-center"},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{sm:""}},[a("span",[t._v("Partner")]),a("model-list-select",{attrs:{list:t.partners,"option-value":"nome","option-text":"nome",placeholder:"select item"},model:{value:t.finder.partner,callback:function(e){t.$set(t.finder,"partner",e)},expression:"finder.partner"}})],1),a("v-col",{attrs:{sm:""}},[a("span",[t._v("Situation")]),a("model-list-select",{attrs:{list:t.options,"option-value":"value","option-text":"value",placeholder:"select item"},model:{value:t.finder.situation,callback:function(e){t.$set(t.finder,"situation",e)},expression:"finder.situation"}})],1),a("v-col",{attrs:{sm:""}},[a("span",[t._v("Start date")]),t._v(" "),a("br"),a("date-picker",{attrs:{valueType:"format"},model:{value:t.finder.startDate,callback:function(e){t.$set(t.finder,"startDate",e)},expression:"finder.startDate"}})],1),a("v-col",{attrs:{sm:""}},[a("span",[t._v("End date")]),t._v(" "),a("br"),a("date-picker",{attrs:{valueType:"format"},model:{value:t.finder.endDate,callback:function(e){t.$set(t.finder,"endDate",e)},expression:"finder.endDate"}})],1),a("v-col",{attrs:{sm:"1"}},[a("v-btn",{staticStyle:{"margin-top":"22px"},attrs:{depressed:"",color:"primary"},on:{click:function(e){return t.executeSearch(t.finder)}}},[t._v(" Search ")])],1)],1)],1),t.isLoading?a("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"64"}})],1):t._e(),t.loans.length||t.isLoading?t._e():a("v-row",{staticClass:"my-12",attrs:{justify:"center","no-gutters":""}},[a("v-alert",{attrs:{dense:"",type:"info"}},[t._v(" Not found any loans with the select filters. ")])],1),a("v-row",{staticStyle:{"margin-top":"10px"},attrs:{justify:"center"}},[!t.isLoading&&t.loans.length?a("v-simple-table",{staticStyle:{width:"100%"},attrs:{"fixed-header":"",height:"350px"},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Partner")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Stock")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("#")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Days")]),a("th",{staticClass:"text-center",staticStyle:{width:"120px"},attrs:{scope:"col"}},[t._v("Due date")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Interest")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Principal")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Payment")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Principal payment")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Principal balance")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Status")]),a("th",{staticClass:"text-center",staticStyle:{width:"120px"},attrs:{scope:"col"}},[t._v("Paid date")])])]),a("tbody",t._l(t.loans,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[a("a",{on:{click:function(a){return t.loadPartner(e.contrato.banco.id)}}},[t._v(t._s(e.contrato.banco.nome))])]),a("td",{staticClass:"text-center"},[a("a",{on:{click:function(a){return t.loadLoan(e.contrato.id)}}},[t._v(t._s(e.contrato.stockId))])]),a("td",{staticClass:"text-center"},[t._v(t._s(e.nroParcela)+"/"+t._s(e.contrato.qtdeParcelas))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.diasPrimeiraParcela?e.diasPrimeiraParcela:e.diasProximaParcela))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.dataPagamento))]),a("td",{staticClass:"text-center"},[t._v("$"+t._s(e.vlParcelaJuros.toFixed(2)))]),a("td",{staticClass:"text-center"},[t._v("$"+t._s((e.vlParcela+(e.balanceAfterPayment-e.valorTotalJurosLoan)).toFixed(2)))]),a("td",{staticClass:"text-center"},[t._v("$"+t._s(e.vlParcela.toFixed(2)))]),a("td",{staticClass:"text-center"},[t._v("$"+t._s((e.vlParcela-e.vlParcelaJuros).toFixed(2)))]),a("td",{staticClass:"text-center"},[t._v("$"+t._s((e.balanceAfterPayment-e.valorTotalJurosLoan).toFixed(2)))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.situacao))]),a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.dataPagamentoPaga)+" "),"PAID"!=e.situacao&&"DEACTIVADED"!=e.situacao?a("span",[a("input",{attrs:{type:"checkbox"},on:{click:function(a){return t.checkLoanForPay(e)}}}),t._v(" Pay ")]):t._e()])])})),0)]},proxy:!0}],null,!1,2909992226)}):t._e(),t.loans.length&&!t.isLoading?a("v-row",{staticStyle:{"margin-top":"5px"},attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{sm:"3"}},[a("strong",[t._v("Total Loans: ")]),t._v(" "+t._s(t.loans.length)+" ")]),a("v-col",{attrs:{sm:"3"}},[a("strong",[t._v("Total Interest: ")]),t._v(" $"+t._s(t.totalInterests.toFixed(2))+" ")]),a("v-col",{attrs:{sm:"3"}},[a("strong",[t._v("Total Payments: ")]),t._v(" $"+t._s(t.totalPayments.toFixed(2))+" ")]),t.loansList.length?a("v-col",{attrs:{sm:"1"}},[a("v-btn",{attrs:{depressed:"",color:"primary"},on:{click:function(e){return t.bulkPay(t.loansList)}}},[t._v(" Bulk pay ")])],1):t._e()],1):t._e()],1)],1)},n=[],r=(a("4de4"),a("d81d"),a("45fc"),a("d3b7"),a("96cf"),a("1da1")),o=a("c1df"),i=a.n(o),c=a("b410"),l=a("ec45"),d=a("d5e5"),u=a("6b3a"),p=a("2ef0"),f=a.n(p),v=a("acb8"),h=a("7841"),m={name:"Home",components:{ModelListSelect:c["ModelListSelect"],DatePicker:l["a"]},data:function(){return{loans:[],partners:[{nome:"All"}],partner:{},finder:{startDate:i()().format("YYYY-MM-DD"),endDate:i()().format("YYYY-MM-DD"),situation:"All",partner:"All"},isLoading:!1,options:[{id:1,value:"All"},{id:2,value:"UNPAID"},{id:3,value:"PAID"},{id:4,value:"DEACTIVADED"}],loansList:[],totalPayments:0,totalInterests:0}},created:function(){this.init()},methods:{init:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.isLoading=!0,t.loans=[],t.partners=[{nome:"All"}],u["a"].findAll().then((function(e){e.data.map((function(e){t.partners.push(e)})),t.partners=t.partners.filter((function(t){return"DEACTIVADED"!=t.situacao})).sort()})).catch((function(t){h["a"].createToastFailed("An error ocurred! Please try again!")})).finally((function(){t.isLoading=!1}));case 4:case"end":return e.stop()}}),e)})))()},executeSearch:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.isLoading=!0,d["a"].buscaAvancada(t.partner,t.situation,t.startDate,t.endDate).then((function(t){e.loans=t.data,e.totalPayments=f.a.sumBy(e.loans,"vlParcela"),e.totalInterests=f.a.sumBy(e.loans,"vlParcelaJuros")})).finally((function(){e.isLoading=!1}));case 2:case"end":return a.stop()}}),a)})))()},loadPartner:function(t){this.$router.push("/partners/".concat(t))},loadLoan:function(t){this.$router.push("/loans/".concat(t))},checkLoanForPay:function(t){this.loansList.some((function(e){return e.id==t.id}))?(f.a.remove(this.loansList,(function(e){return e.id==t.id})),this.$forceUpdate(this.loansList)):this.loansList.push(t)},bulkPay:function(t){var e=this;if(this.checkMoreThanOnePartner(t)){this.isLoading=!0,h["a"].createToastInfo("Payment in process!","Sending emails to partners to verify your paid loans.");var a=[];t.map((function(t){a.push(t.nroParcela)})),v["a"].pay(t[0].contrato.id,a).then((function(t){h["a"].createToastSuccess("Payments processed with success.")})).then((function(){e.init()})).catch((function(t){h["a"].createToastFailed("An error ocurred! Please try again!")})).finally((function(){e.isLoading=!1})),this.$forceUpdate(this.loans),this.$forceUpdate(this.partners)}},checkMoreThanOnePartner:function(t){var e=f.a.uniqBy(t,(function(t){return t.idContrato}));return!(e.length>1)||(h["a"].createToastWarning("It's not possible pay two different partners at the same time. Please, use filters to find and pay separately!"),!1)}}},_=m,y=(a("61cf"),a("2877")),x=a("6544"),P=a.n(x),g=a("0798"),C=a("8336"),b=a("62ad"),k=a("a523"),D=a("490a"),L=a("0fd9"),w=a("1f4f"),A=Object(y["a"])(_,s,n,!1,null,"0edd24dc",null);e["default"]=A.exports;P()(A,{VAlert:g["a"],VBtn:C["a"],VCol:b["a"],VContainer:k["a"],VProgressCircular:D["a"],VRow:L["a"],VSimpleTable:w["a"]})}}]);
//# sourceMappingURL=chunk-dce0c46e.5ec9d3cc.js.map