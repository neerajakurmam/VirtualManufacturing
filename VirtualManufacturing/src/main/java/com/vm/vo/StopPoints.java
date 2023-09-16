package com.vm.vo;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class StopPoints {

	private String deviceId;
    private double x;
    private double y;
    private String title;
    private int duration;
	public StopPoints(String deviceId, double x, double y, String title, int duration) {
		// TODO Auto-generated constructor stub
		this.deviceId = deviceId;
		this.x = x;
		this.y = y;
		this.title = title;
		this.duration = duration;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
    
    
    
}
