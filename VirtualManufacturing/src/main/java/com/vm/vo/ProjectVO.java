package com.vm.vo;

import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;

//@AllArgsConstructor
//@NoArgsConstructor
//@Data
public class ProjectVO {

	private String title;
	private Integer unit;
	private String deviceId;
	private String scale;

	@Transient
	private MultipartFile datalog;

	@Transient
	private MultipartFile image;

	private List<Coordinates> logJsonDataList;

	private List<StopPoints> stopPoints;

	private String imageFileName;

	private String imageUrl;
	
	private String errorMsg;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public MultipartFile getDatalog() {
		return datalog;
	}

	public void setDatalog(MultipartFile datalog) {
		this.datalog = datalog;
	}

	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
	}

	public List<Coordinates> getLogJsonDataList() {
		return logJsonDataList;
	}

	public void setLogJsonDataList(List<Coordinates> logJsonDataList) {
		this.logJsonDataList = logJsonDataList;
	}

	public List<StopPoints> getStopPoints() {
		return stopPoints;
	}

	public void setStopPoints(List<StopPoints> stopPoints) {
		this.stopPoints = stopPoints;
	}

	public String getImageFileName() {
		return imageFileName;
	}

	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public Integer getUnit() {
		return unit;
	}

	public void setUnit(Integer unit) {
		this.unit = unit;
	}
	

}
