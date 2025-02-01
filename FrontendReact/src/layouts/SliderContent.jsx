import React from "react";
import { Menu } from "antd";

const items = [
    { key: "/subjects", label: "Subjects"},
];

export function SliderContent() {

    const onClick = (e) => {
        window.location.href = e.key
    };

    return (
        <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
        />
    );
}
