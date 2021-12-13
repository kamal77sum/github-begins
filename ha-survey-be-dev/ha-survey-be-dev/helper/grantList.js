module.exports ={ admin : [
    { role: 'admin', resource: 'project', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'project', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'project', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'project', action: 'delete:any', attributes: '*' },

    { role: 'admin', resource: 'program', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'program', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'program', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'program', action: 'delete:any', attributes: '*' },

    { role: 'admin', resource: 'report', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'report', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'report', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'report', action: 'delete:any', attributes: '*' },

    { role: 'admin', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'delete:any', attributes: '*' },

    { role: 'admin', resource: 'admin', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'admin', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'admin', action: 'update:any', attributes: '*' },

    { role: 'admin', resource: 'sales', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'sales', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'sales', action: 'update:any', attributes: '*' },

    { role: 'admin', resource: 'operational', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'operational', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'operational', action: 'update:any', attributes: '*' },
],
sales:[
    { role: 'sales', resource: 'project', action: 'read:any', attributes: '*' },
    { role: 'sales', resource: 'program', action: 'read:any', attributes: '*' }
],

operational:[
    { role: 'operational', resource: 'project', action: 'read:any', attributes: '*' },
    { role: 'operational', resource: 'project', action: 'update:any', attributes: '*' },
    { role: 'operational', resource: 'program', action: 'read:any', attributes: '*' },
    { role: 'operational', resource: 'program', action: 'update:any', attributes: '*' }
],
user:[
    { role: 'user', resource: 'report', action: 'read:any', attributes: '*' }
]


}