import React, { useCallback } from "react";
import { useSelector } from "react-redux";



export default function Messages(props) {
    const id = useSelector((state) => state.UserReducer.user.id);

    const setRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    return (
        <div className="row m-0 p-0">
            {props.messages.map((item, index) => {
                const lastMessage = props.messages.length - 1 === index;
                if (item.id === id) {
                    return (
                        <div
                            key={index}
                            ref={lastMessage ? setRef : null}
                            className="col-12 text-end"
                        >
                            <div
                                className="bg-primary"
                                style={{
                                    margin: "5px",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    display: "inline-block",
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: "bold" }}>
                                    {item.firstName} {item.lastName}
                                </p>
                                <p style={{ margin: 0, maxWidth:'500px', wordBreak:'break-all', textAlign:'start'}}>{item.message}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} ref={lastMessage ? setRef : null} className="col-12">
                            <div
                                style={{
                                    backgroundColor: "gray",
                                    margin: "5px",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    display: "inline-block",
                                }}
                            >
                                <p style={{ margin: 0, fontWeight: "bold" }}>
                                    {item.firstName} {item.lastName}
                                </p>
                                <p style={{ margin: 0, maxWidth:'500px', wordBreak:'break-all'}}>{item.message}</p>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
