create table Unit(
	unitId int AUTO_INCREMENT PRIMARY key,
	unitName varchar(50),
	unitValue decimal(18,2)
);

create table Metric(
	metricID int AUTO_INCREMENT PRIMARY key,
	metricName varchar(50),
	metricValue decimal(18,2),
	
	unitId int,
	FOREIGN KEY (unitId) REFERENCES Unit(unitId)
);

create table Context(
	contextId int AUTO_INCREMENT PRIMARY key,
	contextName varchar(50),
	countryID varchar(2),
	unitID int,
	metricID int,
	customMetricName varchar(50),
	customMetricValue decimal(18,2),
	
	FOREIGN KEY (unitId) REFERENCES Unit(unitId),
	FOREIGN KEY (metricID) REFERENCES Metric(metricID)
);
