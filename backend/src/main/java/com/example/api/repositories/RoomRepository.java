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

    @Query("SELECT r FROM Room r WHERE (r.user1.id = :user1Id AND r.user2.id = :user2Id) OR (r.user1.id = :user2Id AND r.user2.id = :user1Id)")
    Room findByUser1IdAndUser2Id(@Param("user1Id") Integer user1Id, @Param("user2Id") Integer user2Id);
}
