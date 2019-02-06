# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "devinsipal"
  spec.version       = "0.1.0"
  spec.authors       = ["devin"]
  spec.email         = ["dsipal@unca.edu"]

  spec.summary       = "the theme for my portfolio"
  spec.homepage      = "http://devinsipal.com"
  spec.license       = "MIT"

    spec.files = `git ls-files -z`.split("\x0").select do |f|
      f.match(%r{^(_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
    end
  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake", "~> 12.0"
end
