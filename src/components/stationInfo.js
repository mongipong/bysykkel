import React from 'react';
import './stationInfo.css';

const StationInfo = ({ stations, statuses }) => {
	return (
		<>
			<div>
				{stations.stations.map((station, index) =>
					<ul key={index}>
						<h4>
							Stasjon: {station.name}
						</h4>
						{statuses.stations.map((status, index) => {
							if (status.station_id === station.station_id) {
								return (
									<div key={index} >
										<p className="text">
											Ledige sykler: &nbsp;
                       <span className="number">
												{status.num_bikes_available} <br />
											</span>
										</p>
										<p className="text">
											Tilgjengelige låser: &nbsp;
                        <span className="number">
												{status.num_docks_available} <br />
											</span>
										</p>
									</div>
								)
							}
							return null;
						})}
					</ul>
				)}
			</div>
		</>
	);
};

export default StationInfo;