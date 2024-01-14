export default function (url: any, params: any) {
  let result = url;
  let matches = url.match(/:(\w*)/gm);
  matches=matches.filter(url => url!==":")
  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      result = result.replace(matches[i], params[matches[i].slice(1)]);
    }
  }
  
  return result;
}
