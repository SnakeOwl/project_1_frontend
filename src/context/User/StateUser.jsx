const StateUser = {
    token: localStorage?.getItem("ACCESS_TOKEN") || undefined,
    bkey: localStorage?.getItem("bkey") || undefined,
};

export default StateUser;
