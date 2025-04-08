package com.example.api.services;

import com.example.api.dtos.AddressRequestDto;
import com.example.api.entities.Address;
import com.example.api.entities.Event;
import com.example.api.mappers.AddressMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressMapper addressMapper;

    @Transactional
    public Address createAddress(AddressRequestDto addressDto, Event event) {
        Address address = Address.builder()
                .street(addressDto.getStreet())
                .city(addressDto.getCity())
                .event(event)
                .build();

        addressMapper.setCoordinates(addressDto, address);
        return address;
    }
}