module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Context',
            [
                {
                    contextID: 1,
                    contextName: 'Area',
                    unitID: 1, //acre
                    metricID: 1, //m2
                    customMetricName: "rai (ไร่)",
                    customMetricValue: 2.529
                },
                {
                    contextID: 2,
                    contextName: 'Distance',
                    unitID: 2, //mile
                    metricID: 2, //metre
                    customMetricName: "wa (วา)",
                    customMetricValue: 804.672
                },
                {
                    contextID: 3,
                    contextName: 'Volume',
                    unitID: 3, //fl oz.
                    metricID: 3, //cm3
                    customMetricName: "mL",
                    customMetricValue: 29.5735296
                },
                {
                    contextID: 4,
                    contextName: 'Speed',
                    unitID: 4, //mph
                    metricID: 4, //m/s
                    customMetricName: "km/h",
                    customMetricValue: 1.609344
                }
            ],
            {}
        ),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Context', null, {}),
};