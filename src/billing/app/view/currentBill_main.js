Ext.define('RaxaEmr.billing.view.currentBill_main', {
    extend: 'Ext.form.Panel',
alias : 'widget.currentBill_main',

    height: 589,
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
                            height: 130,
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
                                            fieldLabel: 'Patient Name '
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Patient Id '
                                        },
                                        {
                                            xtype: 'datefield',
                                            width: 183,
                                            fieldLabel: 'DOB '
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Gender '
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
                                                    fieldLabel: 'Doctor\'s Name '
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Location '
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
                    height: 222,
                    width: 732,
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 206,
                            width: 224,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 217,
                                    width: 222,
                                    title: 'Previous Bills',
                                    columns: [
                                        {
                                            xtype: 'datecolumn',
                                            width: 69,
                                            dataIndex: 'date',
                                            text: 'Date'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            width: 54,
                                            dataIndex: 'number',
                                            text: 'Bill No'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            width: 49,
                                            dataIndex: 'string',
                                            text: 'Amount'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            width: 48,
                                            dataIndex: 'bool',
                                            text: 'Balance'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 206,
                            width: 411,
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 222,
                                    width: 382,
                                    title: 'Current Bill',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Summary'
                                        },
                                        {
                                            xtype: 'container',
                                            height: 51,
                                            width: 381,
                                            layout: {
                                                type: 'table'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 54,
                                                    width: 141,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 'Medicine',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 49,
                                                    width: 91,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 700,
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 51,
                                            width: 381,
                                            layout: {
                                                type: 'table'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 54,
                                                    width: 141,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 'Labs',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 49,
                                                    width: 63,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 560,
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 42,
                                            width: 377,
                                            layout: {
                                                type: 'table'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 43,
                                                    width: 141,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 'Radiology',
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 49,
                                                    width: 63,
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            value: 400,
                                                            fieldLabel: ''
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 13,
                                            width: 377,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    width: 279,
                                                    fieldLabel: 'Total'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 207,
                            width: 118,
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 222,
                                    title: 'Features',
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 47,
                                            width: 118,
                                            text: 'Discount'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 44,
                                            width: 118,
                                            text: 'RSBY'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 37,
                                            width: 118,
                                            text: 'Other'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 72,
                                            width: 118,
                                            text: 'Collect Money'
                                        }
                                    ]
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