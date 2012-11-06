Ext.define('RaxaEmr.billing.store.billingstore', {
    extend: 'Ext.data.Store',
     fields:['uuid','status', 'providerId', 'patientId'],
    model: 'RaxaEmr.billing.model.billModel',
    proxy: {

        type: 'rest',
        
         url: 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing/abc',
        headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json'
            //root: 'results'
        },
        writer: {
            type: 'json'
        }
,        
        afterRequest: function(request,success)
        {console.log("success")}
    }
});