const BACKEND_HOST = "http://localhost:1337/"

export async function fetchWrapper(url, options, is_table = false) {
    const result_fetch = await fetch(BACKEND_HOST + url, options);
    const result_json = await result_fetch.json();
    const { data, error_code, error_message } = result_json;
    
    const data_format = data.map(ele => {
        for (const [key, value] of Object.entries(ele)) {
            if (is_table) {
                ele[key] = value ?? '-';
            }
        }
        return ele;
    })
    return { data: data_format, error_code, error_message }
}