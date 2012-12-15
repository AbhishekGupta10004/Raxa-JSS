Ext.define('RaxaEmr.billing.model.billingItemAdjustment', {
    extend: 'Ext.data.Model',

    field: [{
       
        name: 'name',
        type: 'string'
    },
    
    { name: 'description',
        type: 'string'
    },
    
     { name: 'quantity',
        type: 'int'
    },
    
    {
        name: 'value',
        type: 'int'
}]
});