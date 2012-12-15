/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var c;
var bal;
var global_amount=0;
var tot=0;
var BILL_PAGES = {
    MAIN: {
        value: 0,
        name: "main"
    },
    CURRENT_BILL: {
        value: 1,
        name: "currentBill_main"
    }
/* REPORTS: {
        value: 2,
        name: "reports"
    },
    DRUGGROUPS: {
        value: 3,
        name: "dr ugGroups"
    },
    ALLSTOCK: {
        value: 4,
        name: "allStock"
    },
    REQUISITION: {
        value: 5,
        name: "requisition"
    },
    GOODRECEIPT: {
        value: 6,
        name: "goodReceipt"
    }*/
};

Ext.define("RaxaEmr.billing.controller.billings", {
    extend: 'Ext.app.Controller',
    views: ['RaxaEmr.billing.view.EditItem', 'RaxaEmr.billing.view.Viewport','RaxaEmr.billing.view.currentbill','RaxaEmr.billing.view.main','RaxaEmr.billing.view.discount','RaxaEmr.billing.view.previousBills','RaxaEmr.billing.view.currentBill_main', 'RaxaEmr.billing.view.print_Final','RaxaEmr.billing.view.searchPatient','RaxaEmr.billing.view.previousShow','RaxaEmr.billing.view.AddItem'],
         stores :['RaxaEmr.billing.store.billingstore','RaxaEmr.billing.store.itemStore','RaxaEmr.billing.store.billingItemstore','RaxaEmr.billing.store.previousshow'],

    init: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control({
            
            "main button[action=findPatient]": {
                
                //click: this.displayForm
                click: this.getbill
                
                

            }, 'currentBill_main': {
                
                
                itemEdit: this.onItemEdit
               

            },
             "EditItem button[action=editItem]": {
                
                //click: this.displayForm
              //  click: this.postbill
              click: this.editItem

            },
                        "EditItem button[action=cancelEdit]":{
                click :this.back2
            },

              "currentBill_main button[action=findPatient1]": {
                
                //click: this.displayForm
                click: this.displayForm

            },
             "currentBill_main button[action=saveBill]": {
                
                //click: this.displayForm
                click: this.postbill

            },
            "currentBill_main button[action=payBill]": {
                
                //click: this.displayForm
                click: this.payBill

            },
            "previousBills button[action=findPatient2]": {
                
                //click: this.displayForm
                click: this.displayForm2

            },
            
            
            "previousShow button[action=back]": {
                
                //click: this.displayForm
                click: this.back3

            },
            
            "AddItem button[action=addItem]": {
                
                //click: this.displayForm
              //  click: this.postbill
              click: this.addItem

            },
                        "AddItem button[action=cancel]":{
                click :this.back1
            },
            
            
            'previousBills': {
                
                
                showBill: this.onShowBill
               

            }


          

            
            
        })
    },
   
    
    postbill: function () {
        
        
        var adjustArray = new Array();
        
        
        
          var itemArray = new Array();
        var billitem = Ext.getStore('RaxaEmr.billing.store.itemStore').data;
        
        
       /* for (var i1 = 0; i1 < billitem.items.length; i1++) {
            adjustArray.push({
    discount : billitem.items[i1].data.discount,
        discountreason: billitem.items[i1].data.discountReason
});
            
        }
        */
        for (var i = 0; i < billitem.items.length; i++) {



                itemArray.push({
                    name: billitem.items[i].data.item_name ,
                  
                    
                    description: billitem.items[i].data.category ,
                    quantity: billitem.items[i].data.quantity,
                    value : billitem.items[i].data.price,
                    discount: billitem.items[i].data.discount,
                    discountReason : billitem.items[i].data.discountReason
                   // adjusts : adjustArray[i]
                });
   
        }
        var stat;
        
        if(bal==0)
                {
                              stat=  'Paid';
  
                }
                
                else
                    {
                        stat = 'Pending';
                        
                    }
        
      //  var balance = Ext.getComp('balance1').getValue();
        
        console.log("balance is "+bal);
        var newDrug = Ext.create('RaxaEmr.billing.model.billModel',{
            status:stat,
            name: 'Successful',
        balance:bal,
      
            patientId:c,
            description :'RAXA Bill',
            providerId:'1',
            billItems :itemArray,
            totalAmount:tot
            
        });
    
        
        var store = this.getStore('billingstore');
        console.log(store.getCount());
        store.add(newDrug);
        store.sync();
     
     
   this.printbill();   
         
     
     
   
    },
    getbill: function () {
        
            c = Ext.getCmp('pid').getValue();   
        
        
         url = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing' +'?q='+c;
         console.log(url);
            // store = Ext.create('RaxaEmr.billing.store.billingstore');

              Ext.getStore('RaxaEmr.billing.store.billingstore').setProxy({
            type: 'rest',
            //getting all patients who have prescriptions that have not been filled
            url: url,
             headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }
,        
        afterRequest: function(request,success)
        {console.log("success");
         var number = Ext.getStore('RaxaEmr.billing.store.billingstore');
        console.log(number.getCount());
        
           for (var i = number.getCount()-1; i < number.getCount(); i++) {
       if(number.getAt(i).getData().status=="Pending"){
       global_amount = global_amount +number.getAt(i).getData().balance;
   
       }
   }
  console.log("Amount is "+global_amount); 
  
  var prev = Ext.getCmp('previousamount');
  prev.setValue(global_amount);
        
        
              }
        });
        
    
        var store = this.getStore('billingstore');
                
       
store.sync();
        store.load({
            scope: this ,
            callback : function(){
              
var x1  = Ext.getCmp('gridPrevious').getStore();
       
                  console.log("hye"+x1.getCount());
          x1.load();
          x1.sync();
                  console.log("hye"+x1.getCount());

           var l = Ext.getCmp('mainarea').getLayout();
           
           l.setActiveItem(4);
         //  var global_amount=0;
  var number = Ext.getStore('RaxaEmr.billing.store.billingstore');
  
  
   store.sync();
        console.log("The count of store is"+store.getCount());
         
  
            }}
        
        
        
        );
        
       
    }
    ,
 addItem: function(){
        // add blank item to store -- will automatically add new row to grid
        
      //  Ext.Msg.alert("Item", "In add item form");
        var obj1= Ext.getCmp('item_name1');
        var itemName=obj1.getValue();
        var obj2= Ext.getCmp('category1');
        var itemCategory=obj2.getValue();
         var obj3= Ext.getCmp('quantity1');
        var itemQuantity=obj3.getValue();
         var obj4= Ext.getCmp('price1');
        var itemPrice=obj4.getValue();
        var obj5 =Ext.getCmp('discount1');
        var discount =obj5.getValue();
        var obj6 =Ext.getCmp('discountReason1');
        var discountReason =obj6.getValue();
       console.log(itemName);
      console.log(itemCategory);
      console.log(itemQuantity);
      console.log(itemPrice);
      if(itemName=='')
          {
             Ext.Msg.alert("Alert", "field misssing");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
              
          }
          else if(itemQuantity==0)
              {
                  Ext.Msg.alert("Alert", "Quantity can't be 0");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
              }
               else if(itemPrice==0)
              {
                  Ext.Msg.alert("Alert", "Price can't be 0");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
              }
          else
              {
       var inter= itemQuantity*itemPrice;
       var total = inter- (discount/100)*inter;
       var display ="Total price of the item is:"+total;
      // Ext.Msg.alert("Alert", display);
     //Ext.MessageBox.prompt("Confirm",display);
     //  Ext.Msg.confirm("Confirm", display);
        
     

       var itemStore=this.getStore('RaxaEmr.billing.store.itemStore');
       itemStore.add({
            item_name: itemName,
            category : itemCategory,
            quantity: itemQuantity,
            price:itemPrice,
            discount:discount,
            discountReason:discountReason,
            total:total
        })[0];
      
       itemStore.sync();   
       itemStore.load({
            scope: this ,
            callback : function(){
             //  console.log(itemStore.getCount());

            //console.log(store.getAt(0).getData().status );

      //    console.log(store);
         
        var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);
          x2.load();
          x2.sync();
                //  console.log("hye"+x1.getCount());
               Ext.Msg.alert("Confirm", display, function(btn){
      if (btn == "Yes"){
         alert("abort");
      } else {
        var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
      }
    });
                
           console.log(itemStore.getCount());
            }}
         
        );
            itemStore.sync();
             var itemStore1=this.getStore('RaxaEmr.billing.store.itemStore');
             var amount=Ext.getCmp('current_amount');
             var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
              var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var balance = Ext.getCmp('balance1');
             var prev=global_amount;
             var total;
             
             
             for (var j = 0; j < itemStore1.getCount(); j++) {
                       // order[j].concept = concept[j].getAt(0).getData().uuid;
                       tot=tot+itemStore1.getAt(j).getData().total;
                    }
                    total=tot+prev;
                    bal=total-pay;
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
    

       
      //  
       /* var x2  = Ext.getCmp('gridCurrentBill').getStore();
       // console.log(x2);
          x2.load();
          x2.sync();
                //  console.log("hye"+x1.getCount());
             
                //  console.log("hye"+x1.getCount());
                 var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
           console.log(itemStore.getCount());*/
    
              }
        
    },
   
    
    displayForm1: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');

        var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
     
        
        l.setActiveItem(6);
    //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
    // l1.setActiveItem(1);
    }
    ,
    back1 :function(){
    
    var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);
          x2.load();
          x2.sync();
           var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
                var amount=Ext.getCmp('current_amount');
                var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
              var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var balance = Ext.getCmp('balance1');
             var prev=global_amount;
             var total;
             var tot=0;
             
             for (var j = 0; j < itemStore1.getCount(); j++) {
                       // order[j].concept = concept[j].getAt(0).getData().uuid;
                       tot=tot+itemStore1.getAt(j).getData().total;
                    }
                    total=tot+prev;
                    bal=total-pay;
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
                   
               //  console.log("hye"+x1.getCount());
                 var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
    },

     displayForm2: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');
        
        
        var x3= this.getStore('RaxaEmr.billing.store.billingstore');
        console.log("x3 is"+x3.getCount());
        
        
        var itemStore1 = this.getStore('RaxaEmr.billing.store.itemStore');
         var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);itemStore1.clearData();
                         itemStore1.sync();
                         x2.load();
                          
                        x2.sync();
        //  console.log(evtData.rowIndex);
                       var i;
                       var count=itemStore1.getCount();
                       for(i=0;i<count;i++)
                           {
                               console.log(i);
                           
                      
                       var record1 = itemStore1.getAt(0);            
                                     
                                      itemStore1.remove(record1);
                                       
                                itemStore1.sync();
                           x2.sync();
                           }
                         /* itemStore1.clearData();
                           itemStore1.sync();
                           x2.sync();*/
                             
                                     
                                    
             var amount=Ext.getCmp('current_amount');
             var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
             var balance = Ext.getCmp('balance1');
             var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var prev=global_amount;
             var total;
             var tot=0;
             
             total=tot+prev;
             bal=total-pay;
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
                                 
        var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
    //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
    // l1.setActiveItem(1);
    },
     printbill :function()
    {
         var x=this.getStore('RaxaEmr.billing.store.itemStore');
       var printItems=new Array(); 
        for (var i = 0; i < x.getCount(); i++) {
             printItems[i] = new Array(7);
            
                     printItems[i][0]=i+1;
                     printItems[i][1]=x.getAt(i).getData().item_name;
                     printItems[i][2]=x.getAt(i).getData().category;
                      printItems[i][3]=x.getAt(i).getData().quantity;
                      printItems[i][4]=x.getAt(i).getData().price;
                      printItems[i][5]=x.getAt(i).getData().discount;
                      printItems[i][6]=x.getAt(i).getData().total;
                          
                 
          }
          
         var amount=Ext.getCmp('total_amount').getValue();
         var cur=Ext.getCmp('current_amount').getValue();
         var prev=Ext.getCmp('prev_amount').getValue();
                  var paid=Ext.getCmp('amount_paid').getValue();
                  
                  console.log(cur+" "+prev+" "+amount+" "+paid+" "+bal  );

       localStorage.setItem('rows', JSON.stringify(x.getCount()));
        localStorage.setItem('printItems', JSON.stringify(printItems));
        localStorage.setItem('amount',JSON.stringify(amount));
        
         localStorage.setItem('cur',JSON.stringify(cur));
          localStorage.setItem('prev',JSON.stringify(prev));
           localStorage.setItem('paid',JSON.stringify(paid));
            localStorage.setItem('balance',JSON.stringify(bal));
            
        
         popupWindow = window.open('app/bill.html', 'popUpWindow', 'height=500,width=1100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    },
    displayForm: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');
        var name= Ext.getCmp('item_name1');
     
        name.setValue("");
       var category= Ext.getCmp('category1');
       category.setValue("Medicine");
         var quant= Ext.getCmp('quantity1');
       quant.setValue(0);
         var price= Ext.getCmp('price1');
        price.setValue(0);
        var disc =Ext.getCmp('discount1');
       disc.setValue(0);
       var discReason =Ext.getCmp('discountReason1');
        discReason.setValue("");
        var l = Ext.getCmp('mainarea').getLayout();
        
        
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
    //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
    // l1.setActiveItem(1);
    },
    editItem : function()
   {
        var obj1= Ext.getCmp('item_name2');
        var itemName=obj1.getValue();
        var obj2= Ext.getCmp('category2');
        var itemCategory=obj2.getValue();
         var obj3= Ext.getCmp('quantity2');
        var itemQuantity=obj3.getValue();
         var obj4= Ext.getCmp('price2');
        var itemPrice=obj4.getValue();
        var obj5 =Ext.getCmp('discount2');
        var discount =obj5.getValue();
        var obj6 =Ext.getCmp('discountReason2');
        var discountReason =obj6.getValue();
       var obj7 =Ext.getCmp('otherDiscount2');
       var otherDiscount=obj7.getValue();
       if(discountReason=="Other")
           {
               discountReason=otherDiscount;
           }
           if(itemName=='')
          {
             Ext.Msg.alert("Alert", "field misssing");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(8);
              
          }
          else if(itemQuantity==0)
              {
                  Ext.Msg.alert("Alert", "Quantity can't be 0");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(8);
              }
               else if(itemPrice==0)
              {
                  Ext.Msg.alert("Alert", "Price can't be 0");
             var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(8);
              }
          else
              {
       var inter= itemQuantity*itemPrice;
       var total = inter- (discount/100)*inter;
       var display ="Total price of the item is:"+total;
        var itemStore=this.getStore('RaxaEmr.billing.store.itemStore');
        var record=itemStore.getAt(global_row);
        record.set("item_name",itemName);
        record.set("quantity",itemQuantity);
        record.set("category",itemCategory);
        record.set("price",itemPrice);
        record.set("discount",discount);
        record.set("discountReason",discountReason);
        record.set("total",total);
        
        
         itemStore.sync();   
       itemStore.load({
            scope: this ,
            callback : function(){
             //  console.log(itemStore.getCount());

            //console.log(store.getAt(0).getData().status );

      //    console.log(store);
         
        var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);
          x2.load();
          x2.sync();
                //  console.log("hye"+x1.getCount());
               Ext.Msg.alert("Confirm", display, function(btn){
      if (btn == "Yes"){
         alert("abort");
      } else {
        var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
      }
    });
                
           console.log(itemStore.getCount());
            }}
         
        );
            itemStore.sync();
             var itemStore1=this.getStore('RaxaEmr.billing.store.itemStore');
         
             var amount=Ext.getCmp('current_amount');
             var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
              var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var balance = Ext.getCmp('balance1');
             var prev=global_amount;
             var total;
             var bal;
             var tot=0;
             for (var j = 0; j < itemStore1.getCount(); j++) {
                       // order[j].concept = concept[j].getAt(0).getData().uuid;
                       tot=tot+itemStore1.getAt(j).getData().total;
                    }
                    total=tot+prev;
                    bal=total-pay;
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
        
              }
           
   },

 back2 :function(){
    
    var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);
          x2.load();
          x2.sync();
           var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
                var amount=Ext.getCmp('current_amount');
                var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
              var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var balance = Ext.getCmp('balance1');
             var prev=global_amount;
             var total;
             var tot=0;
             var bal;
             for (var j = 0; j < itemStore1.getCount(); j++) {
                       // order[j].concept = concept[j].getAt(0).getData().uuid;
                       tot=tot+itemStore1.getAt(j).getData().total;
                    }
                    total=tot+prev;
                    bal=total-pay;
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
                   
               //  console.log("hye"+x1.getCount());
                 var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
    },

    back3 :function()
    {
         var l = Ext.getCmp('mainarea').getLayout();
        
        console.log("back called");
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(4);
    },
    
     displayForm: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');
        var name= Ext.getCmp('item_name1');
     
        name.setValue("");
       var category= Ext.getCmp('category1');
       category.setValue("Medicine");
         var quant= Ext.getCmp('quantity1');
       quant.setValue(1);
         var price= Ext.getCmp('price1');
        price.setValue(0);
        var disc =Ext.getCmp('discount1');
       disc.setValue(0);
       var discReason =Ext.getCmp('discountReason1');
        discReason.setValue("RSBY");
        var otherDiscount =Ext.getCmp('otherDiscount1');
        otherDiscount.setValue("");
        var l = Ext.getCmp('mainarea').getLayout();
        
        
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
    //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
    // l1.setActiveItem(1);
    },
    
    payBill :function(){
    
    var x2  = Ext.getCmp('gridCurrentBill').getStore();
        
       // console.log(x2);
          x2.load();
          x2.sync();
           var itemStore1 = Ext.getStore('RaxaEmr.billing.store.itemStore');
                var amount=Ext.getCmp('current_amount');
                var prev_amount=Ext.getCmp('prev_amount');
             var tot_amount=Ext.getCmp('total_amount');
              var paid =Ext.getCmp('amount_paid');
             var pay= paid.getValue();
             var balance = Ext.getCmp('balance1');
             var prev=global_amount;
             var total;
             var tot=0;
             
             for (var j = 0; j < itemStore1.getCount(); j++) {
                       // order[j].concept = concept[j].getAt(0).getData().uuid;
                       tot=tot+itemStore1.getAt(j).getData().total;
                    }
                    total=tot+prev;
                    if(total-pay<=-1)
                        {
                            pay=0;
                            paid.setValue(0);
                            Ext.Msg.alert("alert","Too much being paid");
                        }
                    bal=total-pay;
                    
                    amount.setValue(tot);
                    prev_amount.setValue(prev);
                    tot_amount.setValue(total);
                    balance.setValue(bal);
                   
               //  console.log("hye"+x1.getCount());
                 var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
    },
    
    
    setLayo :function(){
         var l = Ext.getCmp('mainarea').getLayout();
        
        console.log("Hello");
     //   console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(7);
    },
    
    
     onItemEdit: function (evtData) {
        var store = this.getStore('RaxaEmr.billing.store.itemStore');
       /* var record = store.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.drugsEditor.columns[evtData.colIndex]);
        }*/
         console.log("-------------The eventdATA IS:"+evtData.rowIndex);
         global_row=evtData.rowIndex;
         var name= Ext.getCmp('item_name2');
     
        name.setValue(store.getAt(evtData.rowIndex).getData().item_name);
       var category= Ext.getCmp('category2');
       category.setValue(store.getAt(evtData.rowIndex).getData().category);
         var quant= Ext.getCmp('quantity2');
       quant.setValue(store.getAt(evtData.rowIndex).getData().quantity);
         var price= Ext.getCmp('price2');
        price.setValue(store.getAt(evtData.rowIndex).getData().price);
        var disc =Ext.getCmp('discount2');
       disc.setValue(store.getAt(evtData.rowIndex).getData().discount);
       var discReason =Ext.getCmp('discountReason2');
        discReason.setValue(store.getAt(evtData.rowIndex).getData().discountReason);
        var otherDiscount =Ext.getCmp('otherDiscount2');
        otherDiscount.setValue("");
         
         
         var l = Ext.getCmp('mainarea').getLayout();
     //   console.log('Initialized Users! This happens before the Application launch function is called');
     
        l.setActiveItem(8);
         
    },
    
    
     onShowBill : function (evtData){
         var billStore = this.getStore('RaxaEmr.billing.store.billingstore');
         
         var billId = billStore.getAt(evtData.rowIndex).getData().billId;// use this for get request
         // make get call here using billId
         console.log(billId);
    
    
    var url1;
     url1 = 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billingitem' +'?q='+billId;
         console.log(url1);
            // store = Ext.create('RaxaEmr.billing.store.billingstore');

              Ext.getStore('RaxaEmr.billing.store.previousshow').setProxy({
            type: 'rest',
            //getting all patients who have prescriptions that have not been filled
            url: url1,
             headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }
,        
        afterRequest: function(request,success)
        {console.log("success");
         var number = Ext.getStore('RaxaEmr.billing.store.previousshow');
        console.log(number.getCount());
             }
        });
        
    
        var store = this.getStore('RaxaEmr.billing.store.previousshow');
                
       
store.sync();
        store.load({
            scope: this ,
            callback : function(){
              
var x1  = Ext.getCmp('newGrid').getStore();
       
                  console.log("hye"+x1.getCount());
          x1.load();
          x1.sync();
                  console.log("hye"+x1.getCount());

           var l = Ext.getCmp('mainarea').getLayout();
           
           l.setActiveItem(9);
         //  var global_amount=0;
  
  
   store.sync();
        console.log("The count of store is"+store.getCount());
         
  
            }}
        
        
        
        );
        
    
    var x6 =Ext.getCmp('total_amount3');
    
             

    
     var x7 =Ext.getCmp('balance3');
     
     x6.setValue(billStore.getAt(evtData.rowIndex).getData().totalAmount);
x7.setValue(billStore.getAt(evtData.rowIndex).getData().balance);
}

});