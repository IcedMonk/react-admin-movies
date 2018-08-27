
import { GET_LIST, GET_ONE } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'https://api.themoviedb.org';
const API_KEY = '91dd36dcc51c92862485f14714c32742';
const LANGUAGE = 'en-US';
const SORT_BY = 'release_date.asc';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {

    case GET_LIST: {
        let query = {
            api_key: API_KEY,
            language: LANGUAGE,
            sort_by: SORT_BY,
            sort_by: "revenue.desc",
            page: 1,
            "primary_release_date.gte": "2017-01-01",
            "primary_release_date.lte": "2018-12-31",
        }
        return { url: `${API_URL}/3/discover/movie?${stringify(query)}` };
    }

    case GET_ONE: {
        let query = {
            api_key: API_KEY
        }
        console.log(params.id);
        return { url: `${API_URL}/3/movie/${params.id}?${stringify(query)}` };
    }

    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }

};


/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
    case GET_LIST: {
        const image = {"image_path":"http://image.tmdb.org/t/p/w185/" + json.poster_path};
        console.log(json.results.map( x => ({...x, ...image})));
        return {
            data: json.results.map( x => ({...x, ...{"image_path": "http://image.tmdb.org/t/p/w500/" + x.poster_path}}) ),
            total: json.results.length,
        };
    }
    case GET_ONE: {
        json["image_path"] = "http://image.tmdb.org/t/p/w500/" + json.poster_path
        return {
            data: json
        };
    }
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
	const { fetchJson } = fetchUtils;
	const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
	return fetchJson(url, options)
		.then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
