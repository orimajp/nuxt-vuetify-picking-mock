(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{157:function(t,e,n){var content=n(159);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(50).default)("912790d2",content,!0,{sourceMap:!1})},158:function(t,e,n){"use strict";var o=n(157);n.n(o).a},159:function(t,e,n){(t.exports=n(49)(!1)).push([t.i,".detail-label[data-v-0c702cc3]{display:inline-block;width:100px}.first-list[data-v-0c702cc3]{background-color:#0ff}.detail-count[data-v-0c702cc3]{color:#47494e}.list-enter-active[data-v-0c702cc3],.list-leave-active[data-v-0c702cc3]{transition:all 1s}.list-enter[data-v-0c702cc3],.list-leave-to[data-v-0c702cc3]{opacity:0;-webkit-transform:translateX(500px);transform:translateX(500px)}",""])},160:function(t,e,n){var content=n(163);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(50).default)("1c036d14",content,!0,{sourceMap:!1})},161:function(t,e,n){"use strict";var o={props:{details:Array,header:Boolean},methods:{getStyleClass:function(t){return this.header||0!==t?"":"first-list"}}},r=(n(158),n(21)),component=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",{attrs:{"two-line":""}},[t.header?[n("v-subheader",[t._v("明細一覧")]),t._v(" "),n("v-divider")]:t._e(),t._v(" "),n("transition-group",{attrs:{name:"list"}},[t._l(t.details,function(e,o){return[n("v-list-tile",{key:e.location,class:t.getStyleClass(o),attrs:{ripple:""}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(t._f("locationName")(e.location)))]),t._v(" "),n("v-list-tile-sub-title",{staticClass:"text--primary"},[n("span",{staticClass:"detail-label"},[t._v("商品名")]),n("span",[t._v(t._s(e.itemName))])]),t._v(" "),n("v-list-tile-sub-title",{staticClass:"text--primary"},[n("span",{staticClass:"detail-label"},[t._v("商品コード")]),n("span",[t._v(t._s(e.itemCode))])])],1),t._v(" "),n("v-list-tile-action",[n("v-list-tile-action-text",[n("span",{staticClass:"detail-count"},[t._v(t._s(t._f("detailCount")(e.allCount)))])]),t._v(" "),e.completed?n("v-icon",{attrs:{color:"grey darken-2"}},[t._v("\n            done\n          ")]):n("v-icon",{attrs:{color:"grey lighten-3"}},[t._v("\n            done_outline\n          ")])],1)],1),t._v(" "),o+1<t.details.length?n("v-divider",{key:o}):t._e()]})],2)],2)},[],!1,null,"0c702cc3",null);e.a=component.exports},162:function(t,e,n){"use strict";var o=n(160);n.n(o).a},163:function(t,e,n){(t.exports=n(49)(!1)).push([t.i,".rest-count[data-v-5931b4de]{font-size:200%;color:grey;padding:10px;margin-left:10px;text-align:right;border-color:grey;border-style:solid}.fade-enter-active[data-v-5931b4de],.fade-leave-active[data-v-5931b4de]{transition:opacity .05s}.fade-enter[data-v-5931b4de],.fade-leave-to[data-v-5931b4de]{opacity:0}",""])},164:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(48),n(7)),l={props:{confirmMessage:String},data:function(){return{sheet:!1}},methods:{openSheet:function(){this.sheet=!0},closeSheet:function(){this.sheet=!1},confirm:function(){this.closeSheet(),this.$emit("confirm")}}},c=n(21),d=Object(c.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-bottom-sheet",{model:{value:t.sheet,callback:function(e){t.sheet=e},expression:"sheet"}},[n("v-list",[n("v-list-tile",[n("v-btn",{attrs:{color:"warning",large:"",block:""},on:{click:t.confirm}},[t._v(t._s(t.confirmMessage))])],1),t._v(" "),n("v-list-tile",[n("v-btn",{attrs:{large:"",block:""},on:{click:t.closeSheet}},[t._v("キャンセル")])],1)],1)],1)},[],!1,null,null,null).exports,f=n(161),v={data:function(){return{snackbar:!1,message:""}},methods:{open:function(t){this.message=t,this.snackbar=!0},close:function(){this.snackbar=!1}}},h=Object(c.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-snackbar",{attrs:{color:"error","auto-height":"",top:"",timeout:1e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n  "+t._s(t.message)+"\n  "),n("v-btn",{attrs:{dark:"",flat:""},on:{click:t.close}},[t._v("\n    Close\n  ")])],1)},[],!1,null,null,null).exports,m=n(34);function k(t,e){var n=t.getters["bookcase/getInstruction"](e);if(null===n)throw new Error("指示書が見つかりません");if(n.completed())throw new Error("指示書は完了済です。");return n}var y={components:{WorkBottomSheet:d,DetailList:f.a,ErrorSnackbar:h},head:function(){return{title:"出荷検品"}},asyncData:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(e){var n,o,r,l,c,d;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.store,o=e.params,n.dispatch("setTitle","出荷検品"),null!==(r=o.number)){t.next=5;break}throw new Error("指示書番号が指定されていません。");case 5:l=null,c=[],d="";try{l=k(n,r),c=l.details}catch(t){d=t.message}return t.abrupt("return",{instruction:l,details:c,errorMessage:d});case 10:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),data:function(){return{valid:!0,locaCode:"",itemCode:"",locaReadonly:!1}},computed:{itemReadonly:function(){return""===this.locaCode},isError:function(){return""!==this.errorMessage},targetDetails:function(){return this.details.filter(function(t){return!t.completed})},allCount:function(){return 0===this.targetDetails.length?0:this.targetDetails[0].allCount},started:function(){return 0!==this.targetDetails.length&&this.targetDetails[0].started},completeCount:function(){return 0===this.targetDetails.length?0:this.targetDetails[0].completeCount}},watch:{targetDetails:function(){var t=this;0!==this.targetDetails.length?this.targetDetails[0].started||(this.enableLoca(!0),this.locaCode="",setTimeout(function(){return t.setFocusLoca()},500)):this.$router.push("/complete")}},mounted:function(){var t=this;this.$nextTick(function(){if(t.started)return t.locaCode=t.targetDetails[0].location,setTimeout(function(){return t.setFocusItem()},1e3),void t.enableLoca(!1);setTimeout(function(){return t.setFocusLoca()},1e3)})},methods:Object(o.a)({},Object(m.b)("bookcase",["pick"]),{handleKeyUpEnterLocation:function(){if(""!==this.locaCode){if(this.locaCode!==this.targetDetails[0].location)return this.openSnackbar("ロケーションエラー"),void(this.locaCode="");this.setFocusItem(),this.enableLoca(!1)}},handleKyeDownTabLocation:function(){var t=this;setTimeout(function(){return t.setFocusLoca()},500)},handleKeyUpEnterItem:function(){if(""!==this.itemCode){if(this.itemCode!==this.targetDetails[0].itemCode)return this.openSnackbar("商品コードエラー"),void(this.itemCode="");this.itemCode="",this.pick({instructionNumber:this.instruction.instructionNumber,detailId:this.targetDetails[0].detailId})}},handleKyeDownTabItem:function(){var t=this;setTimeout(function(){return t.setFocusItem()},500)},enableLoca:function(t){this.locaReadonly=!t},setFocusLoca:function(){this.isError||this.$refs.locaField.focus()},setFocusItem:function(){this.$refs.itemField.focus()},cancel:function(){this.isError?this.goSelect():this.openSheet()},openSnackbar:function(t){this.$refs.snackbar.open(t)},openSheet:function(){this.$refs.bottomSheet.openSheet()},goSelect:function(){this.$router.push("/select")}})},_=(n(162),Object(c.a)(y,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:"","justify-center":""}},[t.isError?t._e():[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-layout",{attrs:{wrap:"","mb-2":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{ref:"locaField",attrs:{label:"ロケーション",readonly:t.locaReadonly,type:"number"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleKeyUpEnterLocation(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:t.handleKyeDownTabLocation(e)}},model:{value:t.locaCode,callback:function(e){t.locaCode=e},expression:"locaCode"}})],1),t._v(" "),n("v-flex",{attrs:{xs8:""}},[n("v-text-field",{ref:"itemField",attrs:{label:"商品コード",readonly:t.itemReadonly,type:"number"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleKeyUpEnterItem(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:t.handleKyeDownTabItem(e)}},model:{value:t.itemCode,callback:function(e){t.itemCode=e},expression:"itemCode"}})],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("div",{staticClass:"rest-count"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("span",{key:t.completeCount},[t._v(t._s(t.completeCount))])]),t._v("\n            /\n            "),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("span",{key:t.allCount},[t._v(t._s(t.allCount))])])],1)])],1)],1),t._v(" "),n("DetailList",{attrs:{header:!1,details:t.targetDetails}})],t._v(" "),n("v-flex",{attrs:{xs12:""}},[n("v-alert",{attrs:{type:"warning"},model:{value:t.isError,callback:function(e){t.isError=e},expression:"isError"}},[t._v("\n      "+t._s(t.errorMessage)+"\n    ")])],1),t._v(" "),n("WorkBottomSheet",{ref:"bottomSheet",attrs:{confirmMessage:"指示書選択へ"},on:{confirm:t.goSelect}}),t._v(" "),n("ErrorSnackbar",{ref:"snackbar"}),t._v(" "),n("v-footer",{attrs:{fixied:"false",app:""}},[n("v-btn",{attrs:{color:"warning",large:"",block:""},on:{click:t.cancel}},[t._v("\n      検品中断\n    ")])],1)],2)},[],!1,null,"5931b4de",null));e.default=_.exports}}]);