package com.example.api.mappers;

import com.example.api.dtos.EventRequestDto;
import com.example.api.dtos.EventResponseDto;
import com.example.api.entities.Event;
import org.mapstruct.*;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import java.util.List;

@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface EventMapper {
    @Mapping(source = "user.id", target = "userId")
    EventResponseDto toDto(Event event);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    Event toEntity(EventRequestDto dto);

    List<EventResponseDto> toDtoList(List<Event> events);
}