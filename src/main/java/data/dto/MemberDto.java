package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("MemberDto")
public class MemberDto {
	private int num;
	private String myname;
	private String myid;
	private String mypass;
	private String myaddress;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
	private Timestamp gaipday;
}
