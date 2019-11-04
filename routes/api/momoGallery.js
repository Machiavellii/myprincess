router.post('/upload-gallery', auth, async (req, res) => {
  try {
    uploadGallery(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      const photoUrls = req.files.map((item, index) => {
        console.log(item.filename);
        return path.join(item.destination, item.filename);
      });

      // const exist_images = req.body.exist_images;
      // if (exist_images && exist_images.length > 0 && exist_images[0] != "") {
      //   exist_images.map(item => {
      //     photoUrls.unshift(item);
      //   });
      // }

      const profile = await Profile.findOne({
        user: mongoose.Types.ObjectId(req.user._id)
      });

      if (profile) {
        const photoUrls = profile.photoUrls;
        fs.unlink(photoUrls, err => {
          console.log('error', err);
        });
      }
      const photo = await Profile.findOne({
        user: req.user.id
      });
      if (photo) {
        photo.photos.map((item, index) => {
          const imgPath = path.join(item);
          fs.unlink(imgPath, err => {});
        });
      }

      var photos = await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          user: req.user.id,
          photos: photoUrls
        },
        {
          new: true,
          upsert: true
        }
      );

      await Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          photos: photoUrls
        },
        {
          new: true,
          upsert: true
        }
      );
      console.log(photoUrls);
      // return res.status(200).json({ photos: photoUrls });
    });

    console.log('gallery uploaded');
    console.log(req.files);

    return res.status(200).json();
  } catch (err) {
    console.log('gallery upload err:', err);
  }
  return res.status(500).json();
});
