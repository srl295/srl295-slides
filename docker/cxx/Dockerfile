# builds srl295/icu-demo:ubuntu
# Build with: https://github.com/unicode-org/icu-docker.git#:dockerfiles/ubuntu -t icu-build:ubuntu
FROM srl295/icu-build:ubuntu
LABEL maintainer="Steven R. Loomis <srl295@gmail.com>"
# add a couple things
USER root
RUN apt install -qq -y pkg-config emacs-nox
# back to you.
USER build
