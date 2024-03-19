package org.jio.orchidbe.container;

import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.orders.Order;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Configuration
public class OrderContainer {
    private List<Order> orders;

    public OrderContainer() {
        this.orders = new ArrayList<>();
    }

    public void addOrder(Order order) {
        orders.add(order);
    }

    public Order getOrderById(Long id) throws DataNotFoundException {
        for (Order order : orders) {
            if (order.getId().equals(id)) {
                return order;
            }
        }
        throw new DataNotFoundException(
                "Cannot find order with id: " + id);
    }

    public Boolean removeOrderById(Long id) throws DataNotFoundException {
        for (Order order : orders) {
            if (order.getId().equals(id)) {
                orders.remove(order);
                return true;
            }
        }
        throw new DataNotFoundException(
                "Cannot find order with id: " + id);
    }

    public List<Order> getOrders() {
        return orders;
    }

//    public List<Order> getPendingOrders() {
//        return orders.stream()
//                .filter(order -> order.getStatus() == OrderStatus.PENDING)
//                .collect(Collectors.toList());
//    }


}
