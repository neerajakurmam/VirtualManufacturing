package com.vm.vo;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class Coordinates {

	private String timeStamp;
	private String deviceId;
    private double x;
    private double y;
    
	public Coordinates(String timeStamp, String deviceId, double x, double y) {
		// TODO Auto-generated constructor stub
		this.timeStamp = timeStamp;
		this.deviceId = deviceId;
		this.x = x;
		this.y = y;
	}
	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
    
}
