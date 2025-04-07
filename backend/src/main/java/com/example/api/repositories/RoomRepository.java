package com.example.api.repositories;

import com.example.api.entities.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface RoomRepository extends CrudRepository<Room, Integer> {
    @Override
    List<Room> findAll();

    @Query("SELECT r FROM Room r WHERE r.user1.id = :userId OR r.user2.id = :userId")
    List<Room> findByUser1IdOrUser2Id(@Param("userId") Integer userId, @Param("userId") Integer sameUserId);
}
