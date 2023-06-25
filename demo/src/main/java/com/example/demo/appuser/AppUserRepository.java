package com.example.demo.appuser;


import com.example.demo.ban.BanRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByUserId(String userId);

    //DELETE USER



    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);


    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.adminEnabled = TRUE WHERE a.email = ?1")
    int enableByAdmin(String email);


    //check if the given emaail and password match with the database
    @Query("SELECT a FROM AppUser a WHERE a.email = ?1 AND a.password = ?2")
    AppUser login(String email, String password);


    //delete given email's row from the database
    @Modifying
    @Transactional
    @Query("DELETE FROM AppUser a WHERE a.email = ?1")
    int deleteAppUser(String email);

    //get database id by email
    @Query("SELECT a.id FROM AppUser a WHERE a.email = ?1")
    Long getIdByEmail(String email);

    //update the given email's record in the database
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.name = ?2, a.password = ?3, a.phoneNumber = ?4, a.address = ?5 WHERE a.email = ?1")
    void updateInfo(String email, String name, String password, String phone, String address);


    //update info admin including email
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.email = ?1, a.name = ?2, a.phoneNumber = ?3, a.address = ?4, a.appUserRole = ?5 WHERE a.userId = ?6")
    void updateInfoByAdmin(String email, String name, String phone, String address, AppUserRole role, String userId);

    //ban the given email's record in the database
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.locked = TRUE WHERE a.email = ?1")
    void ban(String email);



    //unban the given email's record in the database
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.locked = FALSE WHERE a.email = ?1")
    AppUser unban(String email);


    //GET INFO OF GIVEN EMAIL
    @Query("SELECT a FROM AppUser a WHERE a.email = ?1")
    AppUser view(String email);

    //update password
    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.password = ?2 WHERE a.email = ?1")
    void updatePassword(String email, String password);



    //find all users that has the given role
    @Query("SELECT a FROM AppUser a WHERE a.appUserRole = ?1")
    List<AppUser> findAllByRole(AppUserRole role);

    //find all users that has the given role and enabled
    @Query("SELECT a FROM AppUser a WHERE a.appUserRole = ?1 AND a.adminEnabled = ?2")
    List<AppUser> findAllByRoleAndEnabled(AppUserRole role, boolean enabled);

}
