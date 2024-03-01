package org.jio.orchidbe.repositorys.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 6:48 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.users.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
    List<UserInfo> findAllByDeletedFalseAndUser_Id(Long userId);

    List<UserInfo> findAllByDeletedFalseAndDefaultedTrueAndUser_Id(Long userId);

}
