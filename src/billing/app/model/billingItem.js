Ext.define('RaxaEmr.billing.model.billingItemAdjustment', {
    extend: 'Ext.data.Model',

    field: [{
        name: 'billId',
        type: 'int'
    }, {
        name: 'conceptId',
        type: 'int'
    },
    
    { name: 'providerId',
        type: 'int'
    },
    
     { name: 'encounterId',
        type: 'int'
    },
    
    {
        name: 'orderId',
        type: 'int'
}]
});