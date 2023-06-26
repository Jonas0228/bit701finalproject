package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("BoardDto")
public class BoardDto {
	private int num;
	private String myid;
	private String myname;
	private String photo;
	private String subject;
	private String content;
	private String readcount;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
	private Timestamp writeday;
}
