package com.vm.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vm.vo.Coordinates;
import com.vm.vo.ProjectVO;
import com.vm.vo.StopPoints;


@CrossOrigin(origins = "*",allowCredentials= "true", maxAge = 360000)
@RestController
@RequestMapping("/api/vm")
public class VMController {

	private static final String UPLOAD_DIR = "uploadfiles/";

	/**
	 * 
	 * @param imageFile
	 * @param title
	 * @param textFile
	 * @return
	 */
	@PostMapping(value = "/submitProject", consumes = { MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<ProjectVO> submitProject(@RequestParam("image") MultipartFile imageFile,
			@RequestParam("title") String title,
			@RequestParam("textFile") MultipartFile textFile) {
		try {

			String imageName = StringUtils.cleanPath(imageFile.getOriginalFilename());
			String dataLogName = StringUtils.cleanPath(textFile.getOriginalFilename());
			String imageUrl = "";

			try {
				saveFile(UPLOAD_DIR, dataLogName, textFile);
				imageUrl = saveFile(UPLOAD_DIR, imageName, imageFile);
			} catch (IOException e) {
				e.printStackTrace();
			}
			List<Coordinates> jsonDataList = new ArrayList<>();
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(textFile.getInputStream()))) {
				String line;
				while ((line = reader.readLine()) != null) {
					String[] parts = line.split(",");
					if (parts.length >= 5) {
						Coordinates jsonData = new Coordinates(parts[0],parts[3], Double.parseDouble(parts[4]), Double.parseDouble(parts[5]));
						jsonDataList.add(jsonData);
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			ProjectVO projectVO = prepareProjectVO(title, imageUrl, jsonDataList);

			return new ResponseEntity<ProjectVO>(projectVO, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			ProjectVO projectVO = new ProjectVO();
			return new ResponseEntity<ProjectVO>(projectVO, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param title
	 * @param imageUrl
	 * @param jsonDataList
	 * @return
	 */
	private ProjectVO prepareProjectVO(String title, String imageUrl, List<Coordinates> jsonDataList) {
		ProjectVO projectVO = new ProjectVO();
		projectVO.setTitle(title);
		projectVO.setImageUrl(imageUrl);
		projectVO.setLogJsonDataList(jsonDataList);
		projectVO.setStopPoints(addRandomStopPoints(jsonDataList));
		return projectVO;
	}

	/**
	 * 
	 * @param jsonDataList
	 * @return
	 */
	private List<StopPoints> addRandomStopPoints(List<Coordinates> jsonDataList) {
		    int stopPoints = jsonDataList.size() > 10 ? 5 : 0  ;
	        List<StopPoints> selectedList = new ArrayList<>();

	        // Select random indices and add corresponding objects to the new list
	        for (int i = 0; i < stopPoints; i++) {
	            int randomIndex = new Random().nextInt(jsonDataList.size());
	            Coordinates selectedObject = jsonDataList.get(randomIndex);
	            selectedList.add(new StopPoints(selectedObject.getDeviceId(), selectedObject.getX(), selectedObject.getY(),"Stop "+i , 100));
	        }
		return selectedList;
	}

	/**
	 * 
	 * @param uploadDir
	 * @param fileName
	 * @param multipartFile
	 * @return
	 * @throws IOException
	 */
	public String saveFile(String uploadDir, String fileName,
			MultipartFile multipartFile) throws IOException {

		String fileUrl = "";
		Path uploadPath = Paths.get(uploadDir);

		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		try (InputStream inputStream = multipartFile.getInputStream()) {
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

			fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/vm/images/")
					.path(fileName)
					.toUriString();


		} catch (IOException ioe) {        
			throw new IOException("Could not save image file: " + fileName, ioe);
		}  

		return fileUrl;
	}

	/**
	 * 
	 * @param fileName
	 * @return
	 */
	@GetMapping("/images/{fileName:.+}")
	public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
		try {
			Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
			Resource resource = new UrlResource(filePath.toUri());

			if (resource.exists()) {
				return ResponseEntity.ok().body(resource);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (MalformedURLException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

