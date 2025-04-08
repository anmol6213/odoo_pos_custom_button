{
    'name': 'Custom Action Button in POS',
    'version': '1.0',
    'category': 'Point of Sale',
    'summary': 'Adds a custom Action Button to the POS interface.',
    'depends': ['base', 'point_of_sale'],
    'assets': {
        'point_of_sale._assets_pos': [
            'custom_button/static/src/js/custom_button.js',
            'custom_button/static/src/xml/custom_button.xml',
            'custom_button/static/src/css/custom_button.css',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3', 
}
