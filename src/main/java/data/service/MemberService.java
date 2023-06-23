package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import data.dto.MemberDto;
import data.mapper.MemberMapper;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberService implements MemberServiceInter {
	
	MemberMapper memberMapper;

	@Override
	public void insertMember(MemberDto dto) {
		// TODO Auto-generated method stub
		memberMapper.insertMember(dto);
	}

	@Override
	public List<MemberDto> getAllMembers() {
		// TODO Auto-generated method stub
		return memberMapper.getAllMembers();
	}

	@Override
	public int getSearchId(String myid) {
		// TODO Auto-generated method stub
		return memberMapper.getSearchId(myid);
	}

	@Override
	public int getLogin(String myid, String mypass) {
		// TODO Auto-generated method stub
		Map<String, String> map = new HashMap<>();
		map.put("myid",myid);
		map.put("mypass",mypass);
		
		return memberMapper.getLogin(map);
	}

	@Override
	public String getName(String myid) {
		// TODO Auto-generated method stub
		return memberMapper.getName(myid);
	}

	@Override
	public void deleteMember(int num) {
		// TODO Auto-generated method stub
		memberMapper.deleteMember(num);
	}

}
