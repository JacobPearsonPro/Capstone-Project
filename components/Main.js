import * as views from "./Views";

export default st => `
${views[st.page](st)}`;
