const REQUIRE_LOGIN = "/login/REQUIRE_LOGIN";

export const requireLogin = () => ({ type: REQUIRE_LOGIN });

function loginFunction(state = initialState, action) {
  if (action.type === REQUIRE_LOGIN) {
    return {
      isLogined: true,
    };
  }
}

export default loginFunction;
