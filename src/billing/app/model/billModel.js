/* model for addresses field in the person model */
Ext.define('RaxaEmr.billing.model.billModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'billId',
       // type: 'int'
       persist: false
        
        
    }, {
        name: 'uuid',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    },
    /*{
        name: 'creator',
        type: 'int'
    },
    {
        name: 'date_created',
        type: 'date'
    },
    {
        name: 'retired',
        type: 'boolean'
    }*/
        {
        name: 'providerId',
        type: 'int'
    },
     {
        name: 'patientId',
        type: 'int'
    },
       {
        name: 'name',
        type: 'string'
    } ,
    {
        name: 'description',
        type: 'string'
    } 

]
});