Ext.define('RaxaEmr.billing.view.previousBills', {
    extend: 'Ext.form.Panel',
alias : 'widget.previousBills',
    height: 489,
    width: 759,
    title: 'RAXA',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 28,
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 27,
                            width: 168,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: 'Find Patient ',
                                    tools: [
                                        {
                                            xtype: 'tool'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 193,
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 178,
                            width: 169
                        },
                        {
                            xtype: 'container',
                            height: 168,
                            width: 565,
                            layout: {
                                type: 'table'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 137,
                                    width: 159,
                                    items: [
                                        {
                                            xtype: 'image',
                                            height: 101,
                                            width: 121
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 149,
                                    width: 182,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            width: 180,
                                            fieldLabel: 'Patient Name :'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Patient Id :'
                                        },
                                        {
                                            xtype: 'datefield',
                                            width: 183,
                                            fieldLabel: 'DOB:'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Gender :'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 149,
                                    width: 237,
                                    layout: {
                                        type: 'table'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            height: 97,
                                            width: 29
                                        },
                                        {
                                            xtype: 'container',
                                            height: 108,
                                            width: 190,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Doctor\'s Name :'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Location :'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 210,
                    width: 732,
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 206,
                            width: 322,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 198,
                                    width: 305,
                                    title: 'Previous Bills',
                                    id : 'gridPrevious',
                                        store: Ext.data.StoreManager.lookup('RaxaEmr.billing.store.billingstore'),

                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 78,
                                            dataIndex: 'uuid',
                                            id :'uuid',
                                            text: 'uuid'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 60,
                                            dataIndex: 'status',
                                            id :'status',
                                            text: 'status'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            width: 75,
                                            dataIndex: 'providerId',
                                            id :'providerId',
                                            text: 'providerId'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            width: 90,
                                            id : 'patientId',
                                            dataIndex: 'patientId',
                                            text: 'patientId'
                                        }
                                    ],
                                    viewConfig: {

                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});