module.exports = function (data, Model) {
  data.forEach(function (doc) {
    Model.findOneAndRemove({ _id: data._id })
    .exec(function () {
      var model = new Model(doc)
      model.save()
    })
  })
}