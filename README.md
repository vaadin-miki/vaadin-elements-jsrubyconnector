# vaadin-elements-jsrubyconnector
Repository for static JS assets vaadin-elements gem relies on. In general, you are more interested in [the Vaadin::Elements gem](https://github.com/vaadin-miki/vaadin-elements), rather than this repository.

The `connector` hosts one method and one object. The latest version of this file is automatically included whenever a call to `import_vaadin_elements` is used from a gem.

## serverCallbackResponse

This method iterates over a JSON string to find objects that will be updated.

## ajax

A global object with `post` and `get` methods, without any external dependencies. [Code taken from StackOverflow](http://stackoverflow.com/a/18078705/384484) (thanks Petah!) and adapted to suit the gem.

---

### Version: 20160627

Arrays are `post`ed and `get`ed as proper form arrays. 