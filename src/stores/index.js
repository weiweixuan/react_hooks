import Icestore from "@ice/store";
import userProfile from "./userProfile";
import expandAside from "./expandAside";
import myTodolist from "./myTodolist";

const icestore = new Icestore();
icestore.registerStore("userProfile", userProfile);
icestore.registerStore("expandAside", expandAside);
icestore.registerStore("myTodolist", myTodolist);

export default icestore;
