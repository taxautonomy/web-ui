class Config{
    api_host_dev = "localhost:8080";

    static appTitle = "TaxAutonomy";

    getApiHost = () => {
            var protocol = window.location.protocol;
            if(window.location.hostname === "localhost")
                return protocol + '//' + this.api_host_dev;
            else
                return protocol + '//' + window.location.hostname.replace("web-ui","web-api");
        }

    

    getEnv = () => {
        return "dev";
        }
    }

export default Config;