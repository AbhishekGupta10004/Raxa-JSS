/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
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
        name: "drugGroups"
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
    views: [ 'RaxaEmr.billing.view.Viewport','RaxaEmr.billing.view.currentbill','RaxaEmr.billing.view.main','RaxaEmr.billing.view.discount','RaxaEmr.billing.view.previousBills','RaxaEmr.billing.view.currentBill_main', 'RaxaEmr.billing.view.print_Final','RaxaEmr.billing.view.searchPatient'],
    init: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control({
            
            "main button[action=findPatient]": {
                
                //click: this.displayForm
                click: this.getbill

            }
            
        })
    },
    displayForm: function () {
        console.log('Initialized Users! This happens before the Application launch function is called');

        var l = Ext.getCmp('mainarea').getLayout();
        console.log('Initialized Users! This happens before the Application launch function is called');
        l.setActiveItem(1);
    //  var l1 = Ext.getCmp('addpatientgridarea').getLayout();
    // l1.setActiveItem(1);
    },
    
    postbill: function () {
        var newDrug = Ext.create('RaxaEmr.billing.model.billModel',{
            status: 'Pending',
            name: 'Successful',
            
            patientId:'2',
            description :'rre',
            providerId:'1'
      
            
        })
        
        var store = this.getStore('billingstore');
        console.log(store.getCount());
        store.add(newDrug);
        store.sync();
              console.log(store.getCount());
        console.log(store);
    },
    getbill: function () {
              
        console.log("Hello");
                  
    
        var store = this.getStore('billingstore');
        
        console.log(store.getCount());

        store.load({
            scope: this ,
            callback : function(){
               console.log(store.getCount());

console.log(store.getAt(0).getData().status );

          console.log(store);
          
        var x1  = Ext.getCmp('gridPrevious').getStore();
        console.log(x1);
          x1.load();
          x1.sync();
                  console.log("hye"+x1.getCount());

           var l = Ext.getCmp('mainarea').getLayout();
           
           l.setActiveItem(4);
            }}
        );
        

              
    }
});