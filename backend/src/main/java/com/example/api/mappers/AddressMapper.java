package com.example.api.mappers;

import com.example.api.dtos.AddressRequestDto;
import com.example.api.dtos.AddressResponseDto;
import com.example.api.entities.Address;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    @Mapping(target = "latitude", expression = "java(address.getCoordinates().getY())")
    @Mapping(target = "longitude", expression = "java(address.getCoordinates().getX())")
    AddressResponseDto toDto(Address address);

    @Mapping(target = "coordinates", ignore = true)
    @Mapping(target = "event", ignore = true)
    Address toEntity(AddressRequestDto dto);

    @AfterMapping
    default void setCoordinates(AddressRequestDto dto, @MappingTarget Address address) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(dto.getLongitude(), dto.getLatitude()));
        address.setCoordinates(point);
    }
}