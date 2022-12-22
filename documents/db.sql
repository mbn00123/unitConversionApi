create table Unit(
	unitID int AUTO_INCREMENT PRIMARY key,
	unitName varchar(50),
	unitValue decimal(18,10)
);

create table Metric(
	metricID int AUTO_INCREMENT PRIMARY key,
	metricName varchar(50),
	metricValue decimal(18,10),
	
	unitID int,
	FOREIGN KEY (unitID) REFERENCES Unit(unitID)
);

create table Context(
	contextID int AUTO_INCREMENT PRIMARY key,
	contextName varchar(50),
	unitID int,
	metricID int,
	customMetricName varchar(50),
	customMetricValue decimal(18,10),
	
	FOREIGN KEY (unitID) REFERENCES Unit(unitID),
	FOREIGN KEY (metricID) REFERENCES Metric(metricID)
);
