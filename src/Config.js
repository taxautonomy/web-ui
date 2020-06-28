class Config{
    static api_host_dev = "localhost:8080";

    static appTitle = "TaxAutonomy";

    static defaultSchemeId = '2019-2020-personal-new';

    static googleClientId = "624703653577-qpuf27gt07fnqg1b6iu9f8q7ioslmos2.apps.googleusercontent.com";

    static getApiHost = () => {
            var protocol = window.location.protocol;
            if(window.location.hostname === "localhost")
                return protocol + '//' + Config.api_host_dev;
            else
                return protocol + '//' + window.location.hostname.replace("web-ui","web-api");
        }

    

    getEnv = () => {
        return "dev";
        }
    }

export default Config;